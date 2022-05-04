const socialMediaController = require("../../controller/socialMediaController");
const httpMocks = require("node-mocks-http");
const SocialMedia = require("../../models/index").socialmedia;

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Social Media getAllSocialMedias Testing", () => {
    it("getAll socialmedia should return 200 ", async() => {
        SocialMedia.findAll.mockResolvedValue({ socialmedia: "instagram" });
        await socialMediaController.getAllSocialMedias(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("getAll socialmedia should return 200 ", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        SocialMedia.findAll.mockResolvedValue(rejected);
        await socialMediaController.getAllSocialMedias(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media postSocialMedia Testing", () => {
    it("getAll socialmedia should return 200 ", async() => {
        SocialMedia.create.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("getAll socialmedia should return 200 ", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        SocialMedia.create.mockResolvedValue(rejected);
        await socialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media updateSocialMedias Testing", () => {
    it("getAll socialmedia should return 200 ", async() => {
        SocialMedia.update.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.updateSocialMedias(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("getAll socialmedia should return 200 ", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        SocialMedia.update.mockResolvedValue(rejected);
        await socialMediaController.updateSocialMedias(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media deleteSocialMedia Testing", () => {
    it("getAll socialmedia should return 200 ", async() => {
        SocialMedia.destroy.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("getAll socialmedia should return 200 ", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        SocialMedia.destroy.mockResolvedValue(rejected);
        await socialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});