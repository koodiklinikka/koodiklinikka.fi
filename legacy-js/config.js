
var development = {
  stripe: {
    publicKey: "pk_test_OmNve9H1OuORlmD4rblpjgzh"
  }
}

var production = {
  stripe: {
    publicKey: "pk_live_xrnwdLNXbt20LMxpIDffJnnC"
  }
}

export default function () {
  return process.env.ENV == 'development' ? development : production;
};
