/*
const express = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (for HTML page)
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "") || "audio";

    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);

    const stream = ytdl(videoURL, { quality: "highestaudio" });

    ffmpeg(stream)
      .audioBitrate(128)
      .format("mp3")
      .pipe(res, { end: true });
  } catch (error) {
    res.status(500).send("Error processing video");
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/

/*
// server.js
const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !videoURL.startsWith("http")) {
    return res.status(400).send("Invalid URL");
  }

  const safeFilename = "audio_" + Date.now();
  const outputFile = `${safeFilename}.mp3`;

  // Use yt-dlp to extract and convert to mp3
  const command = `yt-dlp -x --audio-format mp3 -o "${safeFilename}.%(ext)s" "${videoURL}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).send("Error processing video");
    }

    res.download(outputFile, (err) => {
      if (err) console.error("Download error:", err);

      // Clean up the file after sending
      fs.unlink(outputFile, () => {});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/

/*
const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !videoURL.startsWith("http")) {
    return res.status(400).send("Invalid URL");
  }

  const safeFilename = "audio_" + Date.now();
  const outputFile = `${safeFilename}.mp3`;

  // Use the local yt-dlp binary
  const ytDlpPath = path.join(__dirname, "bin", "yt-dlp");

  const command = `${ytDlpPath} -x --audio-format mp3 -o "${safeFilename}.%(ext)s" "${videoURL}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).send("Error processing video");
    }

    res.download(outputFile, (err) => {
      if (err) {
        console.error("Download error:", err);
      }

      // Clean up after sending the file
      fs.unlink(outputFile, () => {});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/

const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !videoURL.startsWith("http")) {
    return res.status(400).send("Invalid URL");
  }

  const safeFilename = "audio_" + Date.now();
  const outputFile = `${safeFilename}.mp3`;

  // Use the local yt-dlp binary
  const ytDlpPath = path.join(__dirname, "bin", "yt-dlp");
  const cookiesPath = path.join(__dirname, "cookies", "cookies.txt");
  const command = `${ytDlpPath} --cookies ${cookiesPath} -x --audio-format mp3 -o "${safeFilename}.%(ext)s" "${videoURL}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).send("Error processing video");
    }

    res.download(outputFile, (err) => {
      if (err) {
        console.error("Download error:", err);
      }

      // Clean up after sending the file
      fs.unlink(outputFile, () => {});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});