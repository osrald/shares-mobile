export default function EnrollmentScreenValidator(studentEntity) {
  let violations = { field: {}, messages: [], timestamp: Date.now() };

  if (!studentEntity.sdtStudentOtherInfo.religion.trim()) {
    violations.field.isReligionValidated = false;
    violations.messages.push("Religion field is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.dialectSpoken.trim()) {
    violations.field.isDialectSpokenValidated = false;
    violations.messages.push("Dialect field is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.fathersName.trim()) {
    violations.field.isFathersNameValidated = false;
    violations.messages.push("Father's name is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.fathersOccupation.trim()) {
    violations.field.isFathersOccupationValidated = false;
    violations.messages.push("Father's occupation is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.fathersContactNo.trim()) {
    violations.field.isFathersContactNoValidated = false;
    violations.messages.push("Father's contact number is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.mothersName.trim()) {
    violations.field.isMothersNameValidated = false;
    violations.messages.push("Mother's name is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.mothersOccupation.trim()) {
    violations.field.isMothersOccupationValidated = false;
    violations.messages.push("Mother's occupation is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.mothersContactNo.trim()) {
    violations.field.isMothersContactNoValidated = false;
    violations.messages.push("Mother's contact number is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.guardianName.trim()) {
    violations.field.isGuardianNameValidated = false;
    violations.messages.push("Guardian name is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.guardianRelation.trim()) {
    violations.field.isGuardianRelationValidated = false;
    violations.messages.push("Relationship with guardian is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.guardianOccupation.trim()) {
    violations.field.isGuardianOccupationValidated = false;
    violations.messages.push("Guardian occupation is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.guardianContactNo.trim()) {
    violations.field.isGuardianContactNoValidated = false;
    violations.messages.push("Guardian contact number is required.");
  }

  if (!studentEntity.sdtStudentOtherInfo.guardianAddress.trim()) {
    violations.field.isGuardianAddressValidated = false;
    violations.messages.push("Guardian contact number is required.");
  }

  if (studentEntity.addrHouseNo === null || !studentEntity.addrHouseNo.trim()) {
    violations.field.isAddrHouseNoValidated = false;
    violations.messages.push("House number is required.");
  }

  if (studentEntity.addrStreet === null || !studentEntity.addrStreet.trim()) {
    violations.field.isAddrStreetValidated = false;
    violations.messages.push("Street name is required.");
  }

  if (studentEntity.addrMakatiResident === null) {
    violations.field.isAddrMakatiResidentValidated = false;
    violations.messages.push(
      "Please specify if Makati resident or not is required"
    );
  } else {
    if (studentEntity.addrMakatiResident.trim() === "") {
      violations.field.isAddrMakatiResidentValidated = false;
      violations.messages.push(
        "Please specify if Makati resident or not is required"
      );
    } else if (studentEntity.addrMakatiResident.trim() === "Y") {
      if (studentEntity.addrMakatiResidentBarangay === null) {
        violations.field.isAddrMakatiResidentBarangayValidated = false;
        violations.messages.push("Please choose barangay");
      } else if (studentEntity.addrMakatiResidentBarangay.code.trim() === "") {
        violations.field.isAddrMakatiResidentBarangayValidated = false;
        violations.messages.push("Please choose barangay");
      }
    } else if (studentEntity.addrMakatiResident.trim() === "N") {
      if (studentEntity.addrBarangay === null) {
        violations.field.isAddrBarangayValidated = false;
        violations.messages.push("Please specify barangay");
      } else if (studentEntity.addrBarangay.trim() === "") {
        violations.field.isAddrBarangayValidated = false;
        violations.messages.push("Please specify barangay");
      }
    }

    if (
      studentEntity.addrCityMunicipality === null ||
      !studentEntity.addrCityMunicipality.trim()
    ) {
      violations.field.isAddrCityMunicipalityValidated = false;
      violations.messages.push("Please specify city/municipality");
    }
  }

  if (!studentEntity.lastSchoolAttended.trim()) {
    violations.field.isLastSchoolAttendedValidated = false;
    violations.messages.push("Last school attended is required");
  }

  if (!studentEntity.lastSchoolAddress.trim()) {
    violations.field.isLastSchoolAddressValidated = false;
    violations.messages.push("Former school is required");
  }

  if (!studentEntity.lastSchoolAverage.trim()) {
    violations.field.isLastSchoolAverageValidated = false;
    violations.messages.push("Last school average is required");
  }

  if (!studentEntity.lastSchoolYearSection.trim()) {
    violations.field.isLastSchoolYearSectionValidated = false;
    violations.messages.push("Previous year and section are required");
  }

  if (!studentEntity.lastSchoolAdviser.trim()) {
    violations.field.isLastSchoolAdviserValidated = false;
    violations.messages.push("Former adviser is required");
  }

  if (!studentEntity.lastSchoolSy.trim()) {
    violations.field.isLastSchoolSyValidated = false;
    violations.messages.push("Last school year is required");
  }

  if (studentEntity.shsTrackEnrolled.code.trim() === "") {
    violations.field.isShsTrackEnrolledValidated = false;
    violations.messages.push("Enrolled track is required.");
  }

  if (studentEntity.shsStrSpecEnrolled.code.trim() === "") {
    violations.field.isShsStrSpecEnrolledValidated = false;
    violations.messages.push("Enrolled stand/specialization is required.");
  }

  return violations;
}
