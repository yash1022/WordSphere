"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_article = exports.get_user = exports.insert_user = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insert_user = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data) {
        console.log("DATA IS NOT PROVIDED");
        return; // return if data is not provided. This helps in preventing unnecessary database operations.
    }
    try {
        const existinguser = yield prisma.user.findUnique({
            where: {
                email: String(data.email)
            },
        });
        if (existinguser) {
            console.log("USER ALREADY EXITS");
            return;
        }
        yield prisma.user.create({
            data: {
                name: data.displayName,
                email: data.email,
                profile_pic: data.photoURL
            }
        });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.insert_user = insert_user;
const get_user = (Email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: String(Email),
            },
            include: {
                articles: true,
            },
        });
        return user;
    }
    catch (e) {
        console.error('Error finding user:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.get_user = get_user;
const create_article = (Email, Title, Content, Category, Picture_url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Category value:", Category);
        let categoryRecord = yield prisma.category.findUnique({
            where: {
                name: Category,
            }
        });
        if (!categoryRecord) {
            console.log('No category record');
            return;
        }
        let author = yield prisma.user.findUnique({
            where: {
                email: String(Email),
            }
        });
        if (!author) {
            console.log("USER NOT FOUND");
            return;
        }
        const createArticle = yield prisma.article.create({
            data: {
                title: String(Title),
                content: String(Content),
                // picture: String(Picture_url),
                author_id: author.id,
                category_id: categoryRecord.id,
            }
        });
        return createArticle;
    }
    catch (e) {
        console.error('Error finding user:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.create_article = create_article;
