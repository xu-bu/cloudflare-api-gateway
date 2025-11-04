import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";
import axios from "axios";

export class RequestHelper extends OpenAPIRoute {
  schema = {
    body: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            additionalProperties: true, // allows any keys in body
          },
        },
      },
    },
    response: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              additionalProperties: true, // allows any keys in response
            },
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const requestConfig = await c.req.json();
    const {data} = await axios.request(requestConfig);

    return {
      success: true,
      data
    };
  }
}
