export default class Helper {
  static humanFileSize(f) {
    var c, d, e, b;
    d = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
    b = Math.log(f) / Math.log(1024);
    e = Math.floor(b);
    c = Math.pow(1024, e);
    if (f === 0) {
      return "0 B";
    }
    else {
      return Math.round(f * 100 / c) / 100 + " " + d[e];
    }
  }

  static getLabelColors(f) {
    var bars = [
      'purple-gradient',
      'blue-gradient',
      'peach-gradient',
      'aqua-gradient',
    ];

    return bars[f % bars.length];
  }

  // https://dev.to/stereobooster/fetch-with-a-timeout-3d6
  static timeoutableFetch = (url, options = {}) => {
    let { timeout = 5000, ...rest } = options;
    if (rest.signal) throw new Error("Signal not supported in timeoutable fetch");
    const controller = new AbortController();
    const { signal } = controller;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Timeout for Promise"));
        controller.abort();
      }, timeout);
      fetch(url, { signal, ...rest })
        .finally(() => clearTimeout(timer))
        .then(resolve, reject);
    });
  };

}