// AudioWorkletProcessor - downsample to 16k and post Int16Array chunks
class PCM16DownsamplerProcessor extends AudioWorkletProcessor {
  constructor(){
    super();
    this._sourceRate = sampleRate;
    this._targetRate = 16000;
    this._ratio = this._sourceRate / this._targetRate;
    this._leftover = 0;
  }
  process(inputs){
    const input = inputs[0];
    if(!input || !input[0]) return true;
    const ch = input[0];
    const inLen = ch.length;
    const outLen = Math.max(1, Math.floor((inLen + this._leftover) / this._ratio));
    const out = new Int16Array(outLen);
    let outI = 0;
    for(let i=0;i<outLen;i++){
      const idx = Math.min(inLen-1, Math.floor((i + this._leftover) * this._ratio));
      let s = ch[idx];
      if (s > 1) s = 1;
      if (s < -1) s = -1;
      out[outI++] = Math.round(s * 0x7fff);
    }
    // small leftover calc (not perfect, but OK for demo)
    this._leftover = Math.max(0, (inLen + this._leftover) - Math.floor(outLen * this._ratio));
    this.port.postMessage(out);
    return true;
  }
}
registerProcessor("pcm16-downsampler", PCM16DownsamplerProcessor);
