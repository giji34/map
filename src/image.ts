export function promiseLoadImage(
  url: string
): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (e) => {
      resolve(void 0);
    };
    image.src = url;
  });
}
