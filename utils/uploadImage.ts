import { getUrl, uploadData } from "aws-amplify/storage";
import { FormEvent } from "react";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

export const uploadImage = async (
  event: FormEvent,
): Promise<{ key: string; href: string }> => {
  const filename = `${uuidv4()}-image`;
  const file = await (event.target as HTMLInputElement).files![0].arrayBuffer();

  try {
    const result = await uploadData({
      key: filename,
      data: file,

      options: {
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            console.log(
              `Upload progress ${
                Math.round(transferredBytes / totalBytes) * 100
              } %`,
            );
          }
        },
      },
    }).result;
    const url = await getUrl({
      key: result.key,
    });

    return {
      href: url.url.href,
      key: result.key,
    };
  } catch (error) {
    console.log("Error : ", error);
    return {
      href: "",
      key: "",
    };
  }
};
