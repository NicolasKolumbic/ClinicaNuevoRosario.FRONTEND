import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DoctorService } from './doctor.service';
import { SearchDoctor } from '../models/search-doctor';
import { MedicalSpeciality } from '../models/medical-speciality';
import { Doctor } from '../models/doctor';
import { Plan } from '../models/plan';
import { HealthInsurance } from '../models/health-insurance';

fdescribe('DoctorService', () => {
  let service: DoctorService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorService],
    });
    service = TestBed.inject(DoctorService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a Doctor filtered by name or lastname', () => {
    // Arrange
    const searchTextRequest = new SearchDoctor();
    searchTextRequest.doctorCriteria = 'rober';
    const doctorMock = [{"doctorId":4,"medicalLicense":"4560","name":"Roberto","lastname":"Giovanelli","email":"roerto.giovanelli@clinicanuevorosario.com","phoneNumber":3415118796,"appointmentDurationDefault":15,"identificationNumber":24153984,"doctorSchedules":[{"doctorScheduleId":10,"day":3,"startTime":8,"endTime":16,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":4,"name":"Cirugía"}],"plans":[]}]
    const response = doctorMock.map((doctor: any) => new Doctor(doctor));
    // Act
    service.searchDoctor(searchTextRequest).subscribe((res: any) => {

      // Assert
      expect(res).not.toBeNull();
      expect(res.length).toBeGreaterThan(0);
      expect(res[0]).toEqual(response[0]);
      expect(res[0]).toBeInstanceOf(Doctor);

    });

    const request = controller.expectOne('https://localhost:7148/api/v1/Doctor/SearchDoctor?doctorCriteria=rober&plan.id=0&plan.name=&MedicalSpecialty.MedicalSpecialtyId=0&MedicalSpecialty.Name=asdfg');
    request.flush(response);


  });

  it('should get a Doctor filtered by Medical Speciality', () => {
    // Arrange
    const searchTextRequest = new SearchDoctor();
    searchTextRequest.medicalSpecialtyDto = new MedicalSpeciality({
      medicalSpecialtyId: 4,
      name: 'Cirugía'
    });

    const doctorsResponseMock = [{"doctorId":4,"medicalLicense":"4560","name":"Roberto","lastname":"Giovanelli","email":"roerto.giovanelli@clinicanuevorosario.com","phoneNumber":3415118796,"appointmentDurationDefault":15,"identificationNumber":24153984,"doctorSchedules":[{"doctorScheduleId":10,"day":3,"startTime":8,"endTime":16,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":4,"name":"Cirugía"}],"plans":[]},{"doctorId":10,"medicalLicense":"4802","name":"Valentina","lastname":"Mari","email":"valentina.mari@clinicanuevorosario.com","phoneNumber":3413874235,"appointmentDurationDefault":15,"identificationNumber":33456782,"doctorSchedules":[{"doctorScheduleId":14,"day":5,"startTime":8,"endTime":16,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":4,"name":"Cirugía"},{"medicalSpecialtyId":12,"name":"Ginecología"}],"plans":[]}];
    const response = doctorsResponseMock.map((doctor: any) => new Doctor(doctor));

    // Act
    service.searchDoctor(searchTextRequest).subscribe((res: any) => {

        // Assert
        expect(res).not.toBeNull();
        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toEqual(response[0]);
        expect(res[0]).toBeInstanceOf(Doctor);
    });

    const request = controller.expectOne('https://localhost:7148/api/v1/Doctor/SearchDoctor?doctorCriteria=&plan.id=0&plan.name=&MedicalSpecialty.MedicalSpecialtyId=4&MedicalSpecialty.Name=Cirugía');
    request.flush(response);
  });

  it('should get a Doctor filtered by Health Insurances Plan', () => {
    // Arrange
    const searchTextRequest = new SearchDoctor();
    searchTextRequest.plan = new Plan({
      id: 3,
      name: 'Base',
      healthInsurance: new HealthInsurance({
        id: 0,
        name: '',
        plans: []
      }),
      fullName: ''
    })

    const doctorsResponseMock = [{"doctorId":20,"medicalLicense":"75412","name":"Mercedes","lastname":"Ballestrini","email":"mercedes.ballestrini@hotmail.com","phoneNumber":3416784512,"appointmentDurationDefault":0,"identificationNumber":28741221,"doctorSchedules":[{"doctorScheduleId":19,"day":2,"startTime":8,"endTime":15,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":19,"name":"Nutrición"}],"plans":[]},{"doctorId":21,"medicalLicense":"56231","name":"Carlos","lastname":"Vignolo","email":"carlos.vignolo@hotmail.com","phoneNumber":3416784512,"appointmentDurationDefault":0,"identificationNumber":24569852,"doctorSchedules":[{"doctorScheduleId":20,"day":3,"startTime":8,"endTime":16,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":30,"name":"Psiquiatría"}],"plans":[]}];
    const response = doctorsResponseMock.map((doctor: any) => new Doctor(doctor));

    // Act
    service.searchDoctor(searchTextRequest).subscribe((res: any) => {

        // Assert
        expect(res).not.toBeNull();
        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toEqual(response[0]);
        expect(res[0]).toBeInstanceOf(Doctor);
    });

    const request = controller.expectOne('https://localhost:7148/api/v1/Doctor/SearchDoctor?doctorCriteria=&plan.id=3&plan.name=Base&MedicalSpecialty.MedicalSpecialtyId=0&MedicalSpecialty.Name=asdfg');
    request.flush(response);
  });

  it('should get all Medical Specialities', () => {
    // Arrange
    const medicalSpecialities = [{"medicalSpecialtyId":1,"name":"Anestesiología"},{"medicalSpecialtyId":2,"name":"Alergología"},{"medicalSpecialtyId":3,"name":"Cardiología"},{"medicalSpecialtyId":4,"name":"Cirugía"},{"medicalSpecialtyId":5,"name":"Cuidados Paliativos"},{"medicalSpecialtyId":6,"name":"Clínica Médica"},{"medicalSpecialtyId":7,"name":"Dermatología"},{"medicalSpecialtyId":8,"name":"Endocrinología"},{"medicalSpecialtyId":9,"name":"Rehabilitación"},{"medicalSpecialtyId":10,"name":"Fonoaudiología"},{"medicalSpecialtyId":11,"name":"Gastroenterología"},{"medicalSpecialtyId":12,"name":"Ginecología"},{"medicalSpecialtyId":13,"name":"Hermatología"},{"medicalSpecialtyId":14,"name":"Infectología"},{"medicalSpecialtyId":15,"name":"Nefrología"},{"medicalSpecialtyId":16,"name":"Neumonología"},{"medicalSpecialtyId":17,"name":"Neurocirugía"},{"medicalSpecialtyId":18,"name":"Neurología"},{"medicalSpecialtyId":19,"name":"Nutrición"},{"medicalSpecialtyId":20,"name":"Obesidad"},{"medicalSpecialtyId":21,"name":"Obstetricia"},{"medicalSpecialtyId":22,"name":"Odontología"},{"medicalSpecialtyId":23,"name":"Oftalmología"},{"medicalSpecialtyId":24,"name":"Oncología"},{"medicalSpecialtyId":25,"name":"Ortopedia y Traumatología"},{"medicalSpecialtyId":26,"name":"Otorrinolaringología"},{"medicalSpecialtyId":27,"name":"Peditría"},{"medicalSpecialtyId":28,"name":"Coloproctología"},{"medicalSpecialtyId":29,"name":"Psicología"},{"medicalSpecialtyId":30,"name":"Psiquiatría"},{"medicalSpecialtyId":31,"name":"Reumatología"},{"medicalSpecialtyId":32,"name":"Urología"}] as MedicalSpeciality[];
    const medicalSpecialitiesMock = medicalSpecialities.map((ms: any) => new MedicalSpeciality(ms));
    // Act
    service.allMedicalSpeacilities().subscribe((medicalSpecialitiesResponse: MedicalSpeciality[]) => {

      // Assert
      expect(medicalSpecialitiesResponse).not.toBeNull();
      expect(medicalSpecialitiesResponse.length).toBeGreaterThan(0);
      expect(medicalSpecialitiesResponse[0]).toEqual(medicalSpecialitiesMock[0]);
      expect(medicalSpecialitiesResponse[0]).toBeInstanceOf(MedicalSpeciality);
    });

    const request = controller.expectOne('https://localhost:7148/api/v1/Doctor/AllMedicalSpecial');
    request.flush(medicalSpecialitiesMock);

  });

  it('should get all doctors', () => {
      // Arrange
      const doctors = [{"doctorId":1,"medicalLicense":"7458","name":"Nahuel","lastname":"Martinez","email":"nahuel.martinez@clinicanuevorosario.com","phoneNumber":3416987744,"appointmentDurationDefault":15,"identificationNumber":30123445,"doctorSchedules":[],"medicalSpecialties":[{"medicalSpecialtyId":1,"name":"Anestesiología"}],"plans":[]},{"doctorId":4,"medicalLicense":"4560","name":"Roberto","lastname":"Giovanelli","email":"roerto.giovanelli@clinicanuevorosario.com","phoneNumber":3415118796,"appointmentDurationDefault":15,"identificationNumber":24153984,"doctorSchedules":[{"doctorScheduleId":10,"day":3,"startTime":8,"endTime":16,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":4,"name":"Cirugía"}],"plans":[]},{"doctorId":5,"medicalLicense":"4602","name":"Marina","lastname":"Parra","email":"marina.parra@clinicanuevorosario.com","phoneNumber":3416885522,"appointmentDurationDefault":15,"identificationNumber":33456153,"doctorSchedules":[],"medicalSpecialties":[{"medicalSpecialtyId":11,"name":"Gastroenterología"}],"plans":[]},{"doctorId":7,"medicalLicense":"5845","name":"Mirian","lastname":"Gimenez","email":"mirian.gimenez@clinicanuevorosario.com","phoneNumber":3415213587,"appointmentDurationDefault":15,"identificationNumber":32456753,"doctorSchedules":[{"doctorScheduleId":18,"day":5,"startTime":7,"endTime":15,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":7,"name":"Dermatología"}],"plans":[]},{"doctorId":8,"medicalLicense":"4899","name":"Martín","lastname":"Rodriguez","email":"martin.rodriguez@clinicanuevorosario.com","phoneNumber":3415993244,"appointmentDurationDefault":15,"identificationNumber":32870005,"doctorSchedules":[{"doctorScheduleId":11,"day":1,"startTime":8,"endTime":15,"appointmentDuration":15},{"doctorScheduleId":12,"day":2,"startTime":8,"endTime":15,"appointmentDuration":15},{"doctorScheduleId":13,"day":3,"startTime":8,"endTime":17,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":5,"name":"Cuidados Paliativos"}],"plans":[]},{"doctorId":9,"medicalLicense":"4700","name":"Brenda","lastname":"Cappadoro","email":"brenda.cappadoro@clinicanuevorosario.com","phoneNumber":3415002155,"appointmentDurationDefault":15,"identificationNumber":34658923,"doctorSchedules":[{"doctorScheduleId":7,"day":2,"startTime":8,"endTime":16,"appointmentDuration":null},{"doctorScheduleId":8,"day":4,"startTime":8,"endTime":16,"appointmentDuration":null},{"doctorScheduleId":9,"day":3,"startTime":8,"endTime":18,"appointmentDuration":30}],"medicalSpecialties":[{"medicalSpecialtyId":8,"name":"Endocrinología"}],"plans":[]},{"doctorId":10,"medicalLicense":"4802","name":"Valentina","lastname":"Mari","email":"valentina.mari@clinicanuevorosario.com","phoneNumber":3413874235,"appointmentDurationDefault":15,"identificationNumber":33456782,"doctorSchedules":[{"doctorScheduleId":14,"day":5,"startTime":8,"endTime":16,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":4,"name":"Cirugía"},{"medicalSpecialtyId":12,"name":"Ginecología"}],"plans":[]},{"doctorId":11,"medicalLicense":"4236","name":"Rogelio","lastname":"Albornoz","email":"rogelio.albornoz@clinicanuevorosario.com","phoneNumber":3413552147,"appointmentDurationDefault":15,"identificationNumber":30753159,"doctorSchedules":[{"doctorScheduleId":15,"day":1,"startTime":8,"endTime":14,"appointmentDuration":15},{"doctorScheduleId":16,"day":2,"startTime":8,"endTime":14,"appointmentDuration":15},{"doctorScheduleId":17,"day":3,"startTime":8,"endTime":14,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":9,"name":"Rehabilitación"}],"plans":[]},{"doctorId":12,"medicalLicense":"6542","name":"Gabriel","lastname":"Messi","email":"gabriel.messi@clinicanuevorosario.com","phoneNumber":3415787795,"appointmentDurationDefault":15,"identificationNumber":33600123,"doctorSchedules":[],"medicalSpecialties":[{"medicalSpecialtyId":10,"name":"Fonoaudiología"}],"plans":[]},{"doctorId":20,"medicalLicense":"75412","name":"Mercedes","lastname":"Ballestrini","email":"mercedes.ballestrini@hotmail.com","phoneNumber":3416784512,"appointmentDurationDefault":0,"identificationNumber":28741221,"doctorSchedules":[{"doctorScheduleId":19,"day":2,"startTime":8,"endTime":15,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":19,"name":"Nutrición"}],"plans":[{"id":3,"name":"Base"}]},{"doctorId":21,"medicalLicense":"56231","name":"Carlos","lastname":"Vignolo","email":"carlos.vignolo@hotmail.com","phoneNumber":3416784512,"appointmentDurationDefault":0,"identificationNumber":24569852,"doctorSchedules":[{"doctorScheduleId":20,"day":3,"startTime":8,"endTime":16,"appointmentDuration":15}],"medicalSpecialties":[{"medicalSpecialtyId":30,"name":"Psiquiatría"}],"plans":[{"id":3,"name":"Base"}]}];
      const doctorsMock = doctors.map((d: any) => new Doctor(d));

      // Act
      service.getAllDoctor().subscribe((doctorsResponse: Doctor[]) => {

      // Assert
      expect(doctorsResponse).not.toBeNull();
      expect(doctorsResponse.length).toBeGreaterThan(0);
      expect(doctorsResponse[0]).toEqual(doctorsMock[0]);
      expect(doctorsResponse[0]).toBeInstanceOf(Doctor);
      });

      const request = controller.expectOne('https://localhost:7148/api/v1/Doctor/GetAllDoctors');
      request.flush(doctorsMock);
  });


});
