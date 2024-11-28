import { StatusCodes } from "http-status-codes";
import { bodyToReview, bodyToUser, bodyToMission, bodyToUserMission, bodyToUserInfo } from "../dtos/user.dto.js";
import { postReview, userSignUp, postMission, postUserMission, listStoreReviews, listUserReviews, listStoreMissions, completeUserMission, editUserInformations} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");

  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);
};

export const handleReviewPost = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              store_id: { type: "number" },
              score: { type: "number" },
              content: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  store_name: {
                    type: "object",
                    properties: {
                      name: { type: "string" }
                    }
                  },
                  user_name: {
                    type: "object",
                    properties: {
                      name: { type: "string" }
                    }
                  },
                  content: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰등록을 요청했습니다!");

  const review = await postReview(bodyToReview(req.body));

  res.status(StatusCodes.OK).success(review);

};

export const handleMissionPost = async (req, res, next) => {
  /*
    #swagger.summary = '미션 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "number" },
              name: { type: "number" },
              point: { type: "number" },
              deadline: { type: "string", format: "date" },
              description: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  deadline: { type: "string" },
                  point: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션등록을 요청합니다.");

  const mission = await postMission(bodyToMission(req.body));

  res.status(StatusCodes.OK).success(mission);
};

export const handleMissionChallenge = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              mission_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  user_name: {
                    type: "object",
                    properties: {
                      name: { type: "string" }
                    }
                  },
                  mission_name: {
                    type: "object",
                    properties: {
                      name: { type: "string" }
                    }
                  },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션도전을 요청합니다.");

  const challengeMission = await postUserMission(bodyToUserMission(req.body));

  res.status(StatusCodes.OK).success(challengeMission);
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("가게 리뷰 조회를 요청합니다.");
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '유저 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "유저 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("유저 리뷰 조회를 요청합니다.");
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        description: { type: "string" },
                        point: { type: "number" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("가게 미션 조회를 요청합니다.");
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

export const handleUserMissionComplete = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미션 완료 API';
    #swagger.responses[200] = {
      description: "유저 미션 완료 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      store_name: {
                        type: "object",
                        properties: {
                          name: { type: "string" }
                        }
                      },
                      user_name: {
                        type: "object",
                        properties: {
                          name: { type: "string" }
                        }
                      },
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("미션 완료를 요청합니다.");

  const challengeMission = await completeUserMission(req.params.userId,req.params.missionId);

  res.status(StatusCodes.OK).success(challengeMission);
};

export const handleUserInformations = async (req, res, next) => {
  /*
    #swagger.summary = '회원 정보 수정 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
             }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 정보 수정 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                name: { type: "string" },
                gender: { type: "string" },
                birth: { type: "string", format: "date" },
                address: { type: "string" },
                detailAddress: { type: "string" },
                phoneNumber: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("회원정보 수정을 요청하였습니다.");
  console.log(req.body);
  const editedUser = await editUserInformations(bodyToUserInfo(req.params.userId,req.body));

  res.status(StatusCodes.OK).success(editedUser);
}