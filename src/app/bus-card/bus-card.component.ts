import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';

/**
 * A Bus Card is a UI widget showing bus arrival times for a specific stop
 * @param  name - The name of the bus stop
 * @param  delay - a fixed time to substract from bus arriva time. This is to take into account walking times to the bus stop.
 * @param  stopNumber - the TransLink bus stop id
 */
@Component({
  selector: 'app-bus-card',
  templateUrl: './bus-card.component.html',
  styleUrls: ['./bus-card.component.css'],
})
export class BusCardComponent implements OnInit {

  @Input() name: string;
  @Input() delay: number;
  @Input() stopNumber: string;

  scheduleList: {routeName: string, time: number}[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Makes a REST api call to get bus stop schedule information
   * @method ngOnInit
   */
  ngOnInit() {
    // Make the HTTP request:
    this.http.get('http://api.translink.ca/rttiapi/v1/stops/'+this.stopNumber+'/estimates?apikey=lgY0ai1TacjmF9rJzlUn&count=4&timeframe=60')
      .subscribe(data => this.generateTime(data));
  }

  /**
   * Takes a TransLink response object and generates a bus stop schedule
   * @method  generateTime
   * @param  data - a TransLink response object
   */
  private generateTime(data) {
    var routeSchedules: RouteSchedule[] = data;
    this.scheduleList = [];

    routeSchedules.forEach((routeSchedule) => {
      routeSchedule.Schedules.forEach((Schedule) => {
        var schedule = {
          routeName: routeSchedule.RouteNo,
          time: Schedule.ExpectedCountdown - this.delay
        };
        this.scheduleList.push(schedule);
      });
    });

    setTimeout(() => {
      // Make the HTTP request:
      this.http.get('http://api.translink.ca/rttiapi/v1/stops/'+this.stopNumber+'/estimates?apikey=lgY0ai1TacjmF9rJzlUn&count=4&timeframe=60')
        .subscribe(data => this.generateTime(data));
    }, 10000);
  }
}

/**
 * An interface representing a bus route that deserve a specific stop
 */
interface RouteSchedule {
  Direction: 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';
  RouteName: string;
  RouteNo: string;
  Schedules: Schedule[];
}

/**
 * An interface representing a single bus schedule for a specific bus stop
 */
interface Schedule {
  AddedStop: boolean;
  AddedTrip: boolean;
  CancelledStop: boolean;
  CancelledTrip: boolean;
  Destination: string;
  ExpectedCountdown: number;
  ExpectedLeaveTime: string;
  LastUpdate: string;
  Pattern: string;
  ScheduleStatus: string;
}
