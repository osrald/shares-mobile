class StudentEntity {
  intialize() {
    return {
      id: null,
      lrnNo: "",
      lastname: "",
      firstname: "",
      middlename: null,
      addrHouseNo: null,
      addrStreet: null,
      addrMakatiResident: null,
      addrMakatiResidentBarangay: null,
      addrBarangay: null,
      addrCityMunicipality: null,
      gender: "",
      dob: "",
      nationality: "",
      birthplace: "",
      status: {
        id: null,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      registrationDate: "",
      elemName: "",
      elemSchoolAddr: "",
      elemCompMonth: "",
      elemCompYear: "",
      elemRegion: {
        id: null,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      elemPeptPasser: "",
      elemPeptMonth: null,
      elemPeptYear: null,
      elemAePasser: "",
      elemAeMonth: null,
      elemAeYear: null,
      jhsName: "",
      jhsAddr: "",
      jhsRegion: {
        id: null,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      jhsCompMonth: "",
      jhsCompYear: "",
      jhsPeptPasser: "",
      jhsPeptMonth: null,
      jhsPeptYear: null,
      jhsAePasser: "",
      jhsAeMonth: null,
      jhsAeYear: null,
      shsSchoolFirstChoice: {
        id: 0,
        code: "",
        name: "",
        desc: null,
        general1: null,
        general2: null,
        entDate: null,
        modDate: null,
      },
      shsSchoolFirstChoiceOthersNm: null,
      shsSchoolFirstChoiceOthersAddr: null,
      shsTrackFirstChoice: {
        id: 0,
        chId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      shsStrSpecFirstChoice: {
        id: 0,
        chId: 0,
        ctId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      shsSchoolSecondChoice: {
        id: 0,
        code: "",
        name: "",
        desc: null,
        general1: null,
        general2: null,
        entDate: null,
        modDate: null,
      },
      shsSchoolSecondChoiceOthersNm: null,
      shsSchoolSecondChoiceOthersAddr: null,
      shsTrackSecondChoice: {
        id: 0,
        chId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
      shsStrSpecSecondChoice: {
        id: 0,
        chId: 0,
        ctId: 0,
        code: "",
        name: "",
        desc: "",
        entDate: null,
        modDate: null,
      },
      shsTrackEnrolled: null,
      shsStrSpecEnrolled: null,
      shsGradeSection: null,
      shsClassAdviser: null,
      shsExamResult: null,
      shsDateEnrolled: null,
      shsSy: null,
      shsSem: null,
      lastSchoolAttended: null,
      lastSchoolAddress: null,
      lastSchoolAverage: null,
      lastSchoolYearSection: null,
      lastSchoolAdviser: null,
      lastSchoolSy: null,
      entDate: null,
      modDate: null,
      sdtStudentOtherInfo: {
        id: null,
        religion: null,
        dialectSpoken: null,
        fathersName: null,
        fathersOccupation: null,
        fathersContactNo: null,
        mothersName: null,
        mothersOccupation: null,
        mothersContactNo: null,
        guardianName: null,
        guardianRelation: null,
        guardianOccupation: null,
        guardianContactNo: null,
        guardianAddress: null,
        entDate: null,
        modDate: null,
      },
      section: null,
      enrSubjects: null,
    };
  }

  initializeExtended() {
    const entity = this.intialize();

    entity.addrMakatiResident = "";
    entity.addrMakatiResidentBarangay = {
      id: 0,
      code: "",
      name: "",
      desc: null,
      entDate: null,
      modDate: null,
    };

    entity.shsTrackEnrolled = {
      id: 0,
      chId: 0,
      code: "",
      name: "",
      desc: null,
      entDate: null,
      modDate: null,
    };
    entity.shsStrSpecEnrolled = {
      id: 0,
      chId: 0,
      ctId: 0,
      code: "",
      name: "",
      desc: null,
      entDate: null,
      modDate: null,
    };

    entity.sdtStudentOtherInfo = {
      id: 0,
      religion: "",
      dialectSpoken: "",
      fathersName: "",
      fathersOccupation: "",
      fathersContactNo: "",
      mothersName: "",
      mothersOccupation: "",
      mothersContactNo: "",
      guardianName: "",
      guardianRelation: "",
      guardianOccupation: "",
      guardianContactNo: "",
      guardianAddress: "",
      entDate: null,
      modDate: null,
    };

    entity.lastSchoolAttended = "";
    entity.lastSchoolAddress = "";
    entity.lastSchoolAverage = "";
    entity.lastSchoolYearSection = "";
    entity.lastSchoolAdviser = "";
    entity.lastSchoolSy = "";

    return entity;
  }

  prepareEnrollmentEntity(entity) {
    if (entity.addrMakatiResident === null) {
      entity.addrMakatiResident = "";
    }

    if (entity.addrMakatiResidentBarangay) {
      entity.addrMakatiResidentBarangay = {
        id: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      };
    }

    if (entity.shsTrackEnrolled === null) {
      entity.shsTrackEnrolled = {
        id: 0,
        chId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      };
    }

    if (entity.shsStrSpecEnrolled === null) {
      entity.shsStrSpecEnrolled = {
        id: 0,
        chId: 0,
        ctId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      };
    }

    if (entity.sdtStudentOtherInfo === null) {
      entity.sdtStudentOtherInfo = {
        id: entity.id,
        religion: "",
        dialectSpoken: "",
        fathersName: "",
        fathersOccupation: "",
        fathersContactNo: "",
        mothersName: "",
        mothersOccupation: "",
        mothersContactNo: "",
        guardianName: "",
        guardianRelation: "",
        guardianOccupation: "",
        guardianContactNo: "",
        guardianAddress: "",
        entDate: null,
        modDate: null,
      };
    }

    if (entity.lastSchoolAttended === null) {
      entity.lastSchoolAttended = "";
    }

    if (entity.lastSchoolAddress === null) {
      entity.lastSchoolAddress = "";
    }

    if (entity.lastSchoolAverage === null) {
      entity.lastSchoolAverage = "";
    }

    if (entity.lastSchoolYearSection === null) {
      entity.lastSchoolYearSection = "";
    }

    if (entity.lastSchoolAdviser === null) {
      entity.lastSchoolAdviser = "";
    }

    if (entity.lastSchoolSy === null) {
      entity.lastSchoolSy = "";
    }

    return entity;
  }
}

export default new StudentEntity();
