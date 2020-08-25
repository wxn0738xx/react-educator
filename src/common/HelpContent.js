// HelpContent component
// Stores the help information for different input fields

const HelpContent = {
  LANGUAGE: 'Please select the language in which the known and unknow texts are written.',
  N: 'An n-gram is a contiguous sequence of n items from a' +
      ' given sample of text or speech. Here, the items are' +
      ' characters (letters, digits or symbols from words).' +
      ' You can try different Character N-Gram lengths to find' +
      ' out which one gives you the best results.' +
      ' This must be an integer from 2 to 12.',
  DISTANCE_FUNCTION: 'Dissimilarity functions are used in the ' +
    'similarity-based method to measure the distance between given ' +
    'documents. You can run with different functions to see which ' +
    'yields the best results.',
  PROFILE_SIZE_UNKNOWN: 'Depending on the context of your documents, ' +
    'your results may be improved by sampling smaller or larger amounts ' +
    'of text. You can use this to change the sample size of your unknown text.',
  PROFILE_SIZE_KNOWN: 'Similar to Profile Size (Unknown Text), you can use ' +
    'this to change the sample size of your known texts to fine tune your results.',
  THRESHOLD: 'The boundary value on the confidence/judgement-score that ' +
    'distinguishes whether the text belongs to the given author. ' +
    'For Cosine distance, this should be a decimal number between 0 to 1.',
  PRE_PROCESSING: 'Different pre-processing techniques can be used ' +
    'to better represent the writing style of authors. ' +
    'Trying different combinations of options may yield better results.',
  EMAIL: 'Please enter a valid e-mail address.',
  LOGIN_EMAIL: 'Your login e-email should be your university e-mail.',
  LOGIN_PASS: 'Your password must be at least 6 characters in length.',
  REG_PASS: 'Please re-enter the password you have entered above.',
  AUTHORID: 'Please enter an identifier for the author (e.g. email, ID).',
};

export default HelpContent;
