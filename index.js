import ora from "ora";

console.log("creating ora instance");

const spinner = ora({ text: "ora loading" }).start();

setTimeout(() => {
  spinner.succeed("ora complete!");
}, 1000);
