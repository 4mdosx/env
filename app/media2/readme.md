# media 2   
Convert format with ffmpeg

## whisper wav

ffmpeg -i input.* -acodec pcm_s16le -ac 1 -ar 16000 out.wav
