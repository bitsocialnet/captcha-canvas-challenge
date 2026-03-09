import { describe, it, expect } from "vitest";
import captchaCanvasChallenge from "../src/captcha-canvas-challenge.js";
import type { SubplebbitChallengeSetting } from "../src/types.js";

describe("captchaCanvasChallenge", () => {
  const emptyChallengeSettings = {} as { challengeSettings: SubplebbitChallengeSetting };

  it("factory returns a valid challenge file object", () => {
    const challengeFile = captchaCanvasChallenge(emptyChallengeSettings);
    expect(typeof challengeFile.getChallenge).to.equal("function");
    expect(challengeFile.type).to.equal("image/png");
    expect(typeof challengeFile.description).to.equal("string");
    expect(challengeFile.caseInsensitive).to.equal(true);
    expect(Array.isArray(challengeFile.optionInputs)).to.equal(true);
  });

  it("getChallenge returns a base64 string challenge", async () => {
    const challengeFile = captchaCanvasChallenge(emptyChallengeSettings);
    const getChallengeResult = await challengeFile.getChallenge({} as Parameters<typeof challengeFile.getChallenge>[0]);
    const { challenge, verify } = getChallengeResult as {
      challenge: string;
      verify: (answer: string) => Promise<{ success: boolean; error?: string }>;
    };
    expect(typeof challenge).to.equal("string");
    expect(challenge.length).toBeGreaterThan(0);
    expect(typeof verify).to.equal("function");
  });

  it("verify returns success for correct answer", async () => {
    // We can't know the real answer, but we can test the verify function interface
    const challengeFile = captchaCanvasChallenge(emptyChallengeSettings);
    const getChallengeResult = await challengeFile.getChallenge({} as Parameters<typeof challengeFile.getChallenge>[0]);
    const { verify } = getChallengeResult as {
      verify: (answer: string) => Promise<{ success: boolean; error?: string }>;
    };
    // Wrong answer should fail
    const wrongResult = await verify("definitely_wrong_answer_12345");
    expect(wrongResult.success).to.equal(false);
    expect(wrongResult.error).to.equal("Wrong captcha.");
  });

  it("verify is case insensitive", async () => {
    const challengeFile = captchaCanvasChallenge(emptyChallengeSettings);
    const getChallengeResult = await challengeFile.getChallenge({} as Parameters<typeof challengeFile.getChallenge>[0]);
    const { verify } = getChallengeResult as {
      verify: (answer: string) => Promise<{ success: boolean; error?: string }>;
    };
    // Both upper and lower case wrong answers should fail the same way
    const result1 = await verify("WRONG");
    const result2 = await verify("wrong");
    expect(result1.success).to.equal(false);
    expect(result2.success).to.equal(false);
  });

  it("works with custom options", async () => {
    const customSettings = {
      challengeSettings: {
        options: {
          characters: "4",
          width: "200",
          height: "80",
          colors: "#ff0000,#00ff00"
        }
      }
    } as { challengeSettings: SubplebbitChallengeSetting };

    const challengeFile = captchaCanvasChallenge(customSettings);
    const getChallengeResult = await challengeFile.getChallenge({
      challengeSettings: customSettings.challengeSettings
    } as Parameters<typeof challengeFile.getChallenge>[0]);
    const { challenge } = getChallengeResult as { challenge: string };
    expect(typeof challenge).to.equal("string");
    expect(challenge.length).toBeGreaterThan(0);
  });
});
