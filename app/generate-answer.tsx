import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}
