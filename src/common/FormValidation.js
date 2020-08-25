// FormValidation component
// Used to validate the input for different parameters
const FormValidation = {
  getNValidationState(n) {
    // const { n } = this.state;
    if (n.length > 0) {
      if (n >= 2 && n <= 12) return 'success';
      else if (n < 2 || n > 12 || isNaN(n)) return 'error';
    }
    return null;
  },

  getNRangeValidationState(nLow, nHigh) {
    // const { nLow, nHigh } = this.state;
    if (nLow.length > 0 && nHigh.length > 0) {
      if (FormValidation.getNValidationState(nLow) === 'success' &&
        FormValidation.getNValidationState(nHigh) === 'success' &&
        parseInt(nLow, 10) < parseInt(nHigh, 10)) {
        return 'success';
      } return 'error';
    }
    return null;
  },

  getKnownValidationState(size) {
    // const size = this.state.profileSizeKnown;
    if (size.length > 0) {
      if (size >= 100 && size <= 1000) return 'success';
      else if (size < 100 || size > 1000 || isNaN(size)) return 'error';
    }
    return null;
  },

  getUnknownValidationState(size) {
    // const size = this.state.profileSizeUnknown;
    if (size.length > 0) {
      if (size >= 100 && size <= 1000) return 'success';
      else if (size < 100 || size > 1000 || isNaN(size)) return 'error';
    }
    return null;
  },

  getUnknownRangeValidationState(start, end, step) {
    // const { start, end, step } = this.state.profileSizeUnknown{...};
    if (start.length > 0 && end.length > 0 && step.length > 0) {
      if (FormValidation.getUnknownValidationState(start) === 'success' &&
      FormValidation.getUnknownValidationState(end) === 'success' &&
      parseInt(step, 10) > 0) {
        if (end >= start) {
          const s = end - start;
          if (s >= step) {
            return 'success';
          } return 'error';
        } return 'error';
      } return 'error';
    }
    return null;
  },

  getThresholdValidationState(threshold) {
    // const { threshold } = this.state;
    if (threshold.length > 0) {
      if (threshold > 0 && threshold <= 1) return 'success';
      else if (threshold <= 0 || threshold > 1 || isNaN(threshold)) return 'error';
    }
    return null;
  },
  getValidationState(key, min, max) {
    if (key.length > 0) {
      if (key >= min && key <= max) return 'success';
      else if (key < min || key > max || isNaN(key)) return 'error';
    }
    return null;
  },

  getIdentifierValidationState(id) {
    if (id !== undefined && id.length > 0) {
      return 'success';
    }
    return null;
  },

  getEmailValidationState(email) {
    // Regular expression for checking for email taken from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (re.test(String(email).toLowerCase())) {
      return 'success';
    }
    return null;
  },

  getPasswordValidationState(pass) {
    if (pass.length >= 6) {
      return 'success';
    }
    return null;
  },

  getPasswordConfirmationState(pass, confirmpass) {
    if (pass === confirmpass && pass !== '') {
      return 'success';
    }
    return null;
  },

  getRoleConfirmationState(role) {
    if (role !== '') {
      return 'success';
    }
    return null;
  },
};

export default FormValidation;
