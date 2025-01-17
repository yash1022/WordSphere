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
exports.likes = exports.getInfo = exports.delete_article = exports.get_saved = exports.saved_article = exports.find_article = exports.create_article = exports.get_user = exports.insert_user = void 0;
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
const find_article = (Email, Category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Category === ' ') {
            const articleRecord = yield prisma.article.findMany({
                include: {
                    author: true,
                }
            });
            return articleRecord;
        }
        else {
            let categoryRecord = yield prisma.category.findUnique({
                where: {
                    name: String(Category),
                }
            });
            if (!categoryRecord) {
                return;
            }
            let articleRecord = yield prisma.article.findMany({
                where: {
                    category_id: categoryRecord.id,
                },
                include: {
                    author: true,
                }
            });
            return articleRecord;
        }
    }
    catch (e) {
        console.error('Error finding user:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.find_article = find_article;
const saved_article = (user_id, org_author_id, article_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userid = yield prisma.user.findUnique({
            where: {
                email: user_id
            }
        });
        if (!userid) {
            console.log("USER NOT FOUND");
            return;
        }
        const authorid = userid.id;
        yield prisma.savedArticle.create({
            data: {
                author_id: authorid,
                original_author_id: org_author_id,
                article_id: article_id
            }
        });
        console.log("ARTICLE SAVED SUCCESSFULY");
    }
    catch (e) {
        console.error('Error saving article:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.saved_article = saved_article;
const get_saved = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: user_id
            }
        });
        if (!user) {
            console.log("No user");
            return;
        }
        user_id = user.id;
        const saved_article = yield prisma.savedArticle.findMany({
            where: {
                author_id: user_id,
            },
            include: {
                article: true,
                originalAuthor: true
            }
        });
        console.log(saved_article);
        return saved_article;
    }
    catch (e) {
        console.error('Error fetching saved-article:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.get_saved = get_saved;
const delete_article = (userid, article_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_data = yield prisma.user.findUnique({
            where: {
                email: userid
            }
        });
        if (!user_data) {
            console.log("USER NOT FOUND");
            return;
        }
        const user_id = user_data.id;
        yield prisma.savedArticle.delete({
            where: {
                author_id_article_id: {
                    author_id: user_data.id,
                    article_id: article_id,
                }
            }
        });
    }
    catch (e) {
        console.error('Error fetching saved-article:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.delete_article = delete_article;
const getInfo = (user, article_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.user.findUnique({
            where: {
                email: user,
            },
        });
        if (!userData) {
            return { error: 'User not found' };
        }
        const likeCheck = yield prisma.likes.findUnique({
            where: {
                author_id_article_id: {
                    author_id: userData.id,
                    article_id: article_id,
                },
            },
        });
        if (!likeCheck) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        console.error('Error fetching saved-article:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getInfo = getInfo;
const likes = (user, article_id, like) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_data = yield prisma.user.findUnique({
            where: {
                email: user
            }
        });
        if (!user_data)
            return;
        if (!like) {
            yield prisma.article.update({
                where: {
                    id: article_id,
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            });
            yield prisma.likes.create({
                data: {
                    author_id: user_data.id,
                    article_id: article_id
                }
            });
        }
        else {
            yield prisma.article.update({
                where: {
                    id: article_id,
                },
                data: {
                    count: {
                        decrement: 1
                    }
                }
            });
            yield prisma.likes.delete({
                where: {
                    author_id_article_id: {
                        author_id: user_data.id,
                        article_id: article_id,
                    }
                }
            });
        }
    }
    catch (e) {
        console.error('Error fetching saved-article:', e);
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.likes = likes;
