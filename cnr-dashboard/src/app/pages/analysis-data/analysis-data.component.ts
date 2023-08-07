import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'cnr-analysis-data',
  templateUrl: './analysis-data.component.html',
  styleUrls: ['./analysis-data.component.scss']
})
export class AnalysisDataComponent implements OnInit, AfterViewInit {

  @ViewChild('healthInsurance', {static: false}) healthInsurance!: ElementRef;
  @ViewChild('doctors', {static: false}) doctors!: ElementRef;

  infohealthInsurance: any[] = [];
  infoDoctors: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

   graphicReportByHealthInsurance(appointments: Appointment[]) {
    const data = new Map();
      appointments.forEach((appointment: Appointment) => {
          let healthInsurance = appointment.patient.plan.healthInsurance.name;
          if(!data.has(healthInsurance)) {
            const list = [appointment];
            data.set(healthInsurance, list );
          } else {
            let healthInsuranceList = data.get(healthInsurance);
            healthInsuranceList.push(appointment);
          }
      })

      data.forEach((value: any, key: any) => {
        const dataUnit = {letter:key, frequency: (value.length / appointments.length)};
        this.infohealthInsurance.push(dataUnit);
      })

      this.healthInsurance.nativeElement.appendChild(this.getGrafic(this.infohealthInsurance));
   }

   graphicReportByDoctor(appointments: Appointment[]) {
    const data = new Map();
    appointments.forEach((appointment: Appointment) => {
        let doctorFullName = appointment.doctor.fullName;
        if(!data.has(doctorFullName)) {
          const list = [appointment];
          data.set(doctorFullName, list );
        } else {
          let healthInsuranceList = data.get(doctorFullName);
          healthInsuranceList.push(appointment);
        }
    })

    data.forEach((value: any, key: any) => {
      const dataUnit = {letter:key, frequency: (value.length / appointments.length)};
      this.infoDoctors.push(dataUnit);
    })

    this.doctors.nativeElement.appendChild(this.getGrafic(this.infoDoctors));
   }

  ngAfterViewInit(): void {
    this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[]) => {
      this.graphicReportByHealthInsurance(appointments);
      this.graphicReportByDoctor(appointments);
    });
  }

  ngOnInit(): void {
      
  }

  getGrafic(data: any[]) {
    const alphabet = data;
    const barHeight = 25;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 100;
  const width = 928;
  const height = Math.ceil((alphabet.length + 0.1) * barHeight) + marginTop + marginBottom;
 const max = d3.max(alphabet, d => d.frequency);
  // Create the scales.
  const x = d3.scaleLinear()
      .domain([0, max!])
      .range([marginLeft, width - marginRight]);
  
  const y = d3.scaleBand()
      .domain(d3.sort(alphabet, d => -d.frequency).map(d => d.letter))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

  // Create a value format.
  const format = x.tickFormat(20, "%");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
  
  // Append a rect for each letter.
  svg.append("g")
      .attr("fill", "#23b5d3")
    .selectAll()
    .data(alphabet)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.letter) ?? 0)
      .attr("width", (d) => x(d.frequency) - x(0))
      .attr("height", y.bandwidth());
  
  // Append a label for each letter.
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
    .selectAll()
    .data(alphabet)
    .join("text")
      .attr("x", (d) => x(d.frequency))
      .attr("y", (d) => (y(d.letter) || 0) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => format(d.frequency))
    .call((text) => text.filter(d => x(d.frequency) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  // Create the axes.
  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80, "%"))
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0));

  return svg.node();
  }

}
