export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  };

  export class NoExistStoreError extends Error {
    errorCode = "S001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  };

  export class DuplicateUserMissionError extends Error {
    errorCode = "U002";

    constructor(reason,data){
        super(reason);
      this.reason = reason;
      this.data = data;
    }
};

