import Bun, { Glob } from "bun";
import { getAverageColor } from "fast-average-color-node";
import fs from "fs";
import imageSize from "image-size";

const glob = new Glob("*.jpg");

let int = 0;

const arr: number[][] = [];

const averageColors: string[] = [];

for (const file of glob.scanSync(".")) {
	// console.log(__dirname + "/" + file);

	fs.renameSync(__dirname + "/" + file, __dirname + "/" + int + ".jpg");
	const { height, width } = imageSize(__dirname + "/" + file);

	arr[int] = [height!, width!];

	const color = await getAverageColor(__dirname + "/" + file);
	averageColors.push(color.hex);

	int++;
}

// console.log(arr, arr.length);

Bun.write(__dirname + "/metadata.json", JSON.stringify(arr));
Bun.write(__dirname + "/colors.json", JSON.stringify(averageColors));
