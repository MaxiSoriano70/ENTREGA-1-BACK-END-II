import { promises as fs } from "fs";
import crypto from "crypto";

class FileManager {
    constructor(path) {
        this.path = path;
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(this.path, "[]");
            return [];
        } else {
            throw error;
        }
        }
    }

    async _writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    createOne = async (data) => {
        const items = await this._readFile();
        items.push(data);
        await this._writeFile(items);
        return data;
    };

    readAll = async (filter = {}) => {
        const items = await this._readFile();
        if (Object.keys(filter).length === 0) return items;

        return items.filter((item) =>
        Object.entries(filter).every(([key, value]) => item[key] === value)
        );
    };

    readBy = async (data) => {
        const items = await this._readFile();
        return items.find((item) =>
        Object.entries(data).every(([key, value]) => item[key] === value)
        );
    };

    readById = async (id) => {
        const items = await this._readFile();
        return items.find((item) => item._id === id);
    };

    updateById = async (id, newData) => {
        const items = await this._readFile();
        const index = items.findIndex((item) => item._id === id);
        if (index === -1) return null;
        items[index] = { ...items[index], ...newData };
        await this._writeFile(items);
        return items[index];
    };

    destroyById = async (id) => {
        const items = await this._readFile();
        const index = items.findIndex((item) => item._id === id);
        if (index === -1) return null;
        const [deletedItem] = items.splice(index, 1);
        await this._writeFile(items);
        return deletedItem;
    };
}

export default FileManager;

const userManager = new FileManager("./src/data/fs/data/users.json");
const productManager = new FileManager("./src/data/fs/data/products.json");

export { userManager, productManager };
