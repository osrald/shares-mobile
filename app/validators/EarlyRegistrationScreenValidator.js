import moment from "moment";

export default function EarlyRegistrationScreenValidator(studentEntity) {
  let violations = { field: {}, messages: [], timestamp: Date.now() };

  if (!studentEntity.lastname.trim()) {
    violations.field.isLastnameValidated = false;
    violations.messages.push("Lastname is required.");
  }

  if (!studentEntity.firstname.trim()) {
    violations.field.isFirstnameValidated = false;
    violations.messages.push("Firstname is required.");
  }

  if (!studentEntity.dob.trim()) {
    violations.field.isDobValidated = false;
    violations.messages.push("Date of birth is required.");
  }

  if (studentEntity.dob.trim()) {
    if (!moment(studentEntity.dob.trim(), "YYYY-MM-DD", true).isValid()) {
      violations.field.isDobValidated = false;
      violations.messages.push("Date of birth has an invalid date.");
    }
  }

  if (!studentEntity.gender.trim()) {
    violations.field.isGenderValidated = false;
    violations.messages.push("Gender is required.");
  }

  if (!studentEntity.birthplace.trim()) {
    violations.field.isBirthplaceValidated = false;
    violations.messages.push("Birthplace is required.");
  }

  if (!studentEntity.nationality.trim()) {
    violations.field.isNationalityValidated = false;
    violations.messages.push("Nationality is required.");
  }

  if (!studentEntity.elemName.trim()) {
    violations.field.isElemNameValidated = false;
    violations.messages.push("Elementary school name is required.");
  }

  if (!studentEntity.elemSchoolAddr.trim()) {
    violations.field.isElemSchoolAddrValidated = false;
    violations.messages.push("Elementary school address is required.");
  }

  if (
    !studentEntity.elemCompMonth.trim() ||
    !studentEntity.elemCompYear.trim()
  ) {
    violations.field.isElemCompMonthYearValidated = false;
    violations.messages.push("Elementary completion (month/year) is required.");
  }

  if (!studentEntity.elemRegion.code.trim()) {
    violations.field.isElemRegionValidated = false;
    violations.messages.push("Elementary region is required.");
  }

  if (!studentEntity.elemPeptPasser.trim()) {
    violations.field.isElemPeptPasserValidated = false;
    violations.messages.push("Elementary PEPT passer (Yes/No) is required.");
  }

  if (studentEntity.elemPeptPasser.trim() === "Y") {
    if (
      !studentEntity.elemPeptMonth.trim() ||
      !studentEntity.elemPeptYear.trim()
    ) {
      violations.field.isElemPeptMonthYearValidated = false;
      violations.messages.push(
        "Elementary PEPT taken (Month/Year) is required."
      );
    }
  }

  if (!studentEntity.elemAePasser.trim()) {
    violations.field.isElemAePasserValidated = false;
    violations.messages.push("Elementary A & E passer (Yes/No) is required.");
  }

  if (studentEntity.elemAePasser.trim() === "Y") {
    if (!studentEntity.elemAeMonth.trim() || !studentEntity.elemAeYear.trim()) {
      violations.field.isElemAeMonthYearValidated = false;
      violations.messages.push(
        "Elementary A & E taken (Month/Year) is required."
      );
    }
  }

  if (!studentEntity.jhsName.trim()) {
    violations.field.isJhsNameValidated = false;
    violations.messages.push("Junior high school name is required.");
  }

  if (!studentEntity.jhsAddr.trim()) {
    violations.field.isJhsAddrValidated = false;
    violations.messages.push("Junior high school address is required.");
  }

  if (!studentEntity.jhsCompMonth.trim() || !studentEntity.jhsCompYear.trim()) {
    violations.field.isJhsMonthYearCompletionValidated = false;
    violations.messages.push(
      "Junior high school completion (Month/Year) is required."
    );
  }

  if (!studentEntity.jhsRegion.code.trim()) {
    violations.field.isJhsRegionValidated = false;
    violations.messages.push("Junior high school region is required.");
  }

  if (!studentEntity.jhsPeptPasser.trim()) {
    violations.field.isJhsPeptPasserValidated = false;
    violations.messages.push(
      "Junior high school PEPT passer (Yes/No) is required."
    );
  }

  if (studentEntity.jhsPeptPasser.trim() === "Y") {
    if (
      !studentEntity.jhsPeptMonth.trim() ||
      !studentEntity.jhsPeptYear.trim()
    ) {
      violations.field.isJhsPeptMonthYearValidated = false;
      violations.messages.push(
        "Junior high school PEPT taken (Month/Year) is required."
      );
    }
  }

  if (!studentEntity.jhsAePasser.trim()) {
    violations.field.isJhsAePasserValidated = false;
    violations.messages.push(
      "Junior high school A & E passer (Yes/No) is required."
    );
  }

  if (studentEntity.jhsAePasser.trim() === "Y") {
    if (!studentEntity.jhsAeMonth.trim() || !studentEntity.jhsAeYear.trim()) {
      violations.field.isJhsAeMonthYearValidated = false;
      violations.messages.push(
        "Junior high school A & E taken (Month/Year) is required."
      );
    }
  }

  if (!studentEntity.shsSchoolFirstChoice.code.trim()) {
    violations.field.isShsSchoolFirstChoiceValidated = false;
    violations.messages.push("First choice school is required.");
  }

  if (!studentEntity.shsTrackFirstChoice.code.trim()) {
    violations.field.isShsTrackFirstChoiceValidated = false;
    violations.messages.push("First choice track is required.");
  }

  if (!studentEntity.shsStrSpecFirstChoice.code.trim()) {
    violations.field.isShsStrSpecFirstChoiceValidated = false;
    violations.messages.push("First choice strand/specialization is required.");
  }

  if (
    studentEntity.shsSchoolFirstChoice.code.trim() !== "" &&
    studentEntity.shsSchoolFirstChoice.code.trim() === "999"
  ) {
    if (!studentEntity.shsSchoolFirstChoiceOthersNm.trim()) {
      violations.field.isShsSchoolFirstChoiceOthersNmValidated = false;
      violations.messages.push(
        "You have chosen 'other school' as your first choice school, please also provide the school name."
      );
    }

    if (!studentEntity.shsSchoolFirstChoiceOthersAddr.trim()) {
      violations.field.isShsSchoolFirstChoiceOthersAddrValidated = false;
      violations.messages.push(
        "You have chosen 'other school' as your first choice school, please also provide the school address."
      );
    }
  }

  if (studentEntity.shsSchoolSecondChoice !== null) {
    if (
      studentEntity.shsSchoolSecondChoice.code.trim() !== "" &&
      studentEntity.shsSchoolSecondChoice.code.trim() === "999"
    ) {
      if (!studentEntity.shsSchoolSecondChoiceOthersNm.trim()) {
        violations.field.isShsSchoolSecondChoiceOthersNmValidated = false;
        violations.messages.push(
          "You have chosen 'other school' as your second choice school, please also provide the school name."
        );
      }

      if (!studentEntity.shsSchoolSecondChoiceOthersAddr.trim()) {
        violations.field.isShsSchoolSecondChoiceOthersAddrValidated = false;
        violations.messages.push(
          "You have chosen 'other school' as your second choice school, please also provide the school address."
        );
      }

      if (!studentEntity.shsTrackSecondChoice.code.trim()) {
        violations.field.isShsTrackSecondChoiceValidated = false;
        violations.messages.push(
          "You have chosen 'other school' as your second choice school, please also select your track."
        );
      }

      if (!studentEntity.shsStrSpecSecondChoice.code.trim()) {
        violations.field.isShsStrandSpecSecondChoiceValidated = false;
        violations.messages.push(
          "You have chosen 'other school' as your second choice school, please also select your strand/specialization."
        );
      }
    }

    if (
      studentEntity.shsSchoolSecondChoice.code.trim() !== "" &&
      studentEntity.shsSchoolSecondChoice.code.trim() !== "999"
    ) {
      if (!studentEntity.shsTrackSecondChoice.code.trim()) {
        violations.field.isShsTrackSecondChoiceValidated = false;
        violations.messages.push(
          "You have selected a second choice school wherein track is required."
        );
      }

      if (!studentEntity.shsStrSpecSecondChoice.code.trim()) {
        violations.field.isShsStrandSpecSecondChoiceValidated = false;
        violations.messages.push(
          "You have selected a second choice school wherein strand/specialization is required."
        );
      }
    }
  }

  return violations;
}
