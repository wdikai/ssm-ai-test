exports.GameObjectManager = class GameObjectManager {
    /**
     * @returns {GameObjectManager}
     */
    static get instance() {
        if(!GameObjectManager._instance) {
            GameObjectManager._instance = new GameObjectManager();
        }

        return GameObjectManager._instance;
    }

    constructor() {
        this.allObjects = new Set();
        this.objectsByTag = new Map();
    }

    /**
     * Add game object to manager
     * @param {GameObject} object 
     * @returns {GameObjectManager}
     */
    addObject(object) {
        const objects = this.objectsByTag.get(object.tag) || new Set();
        objects.add(object);
        this.allObjects.add(object);
        this.objectsByTag.set(object.tag, objects);

        return this;
    }

    /**
     * Remove game object from manager
     * @param {GameObject} object 
     * @returns {GameObjectManager}
     */
    deleteObject(object) {
        const objects = this.objectsByTag.get(object.tag) || new Set();
        objects.delete(object);
        this.allObjects.delete(object);
        this.objectsByTag.set(object.tag, objects);

        return this;
    }

    /**
     * Get Set of game objects by tag
     * @param {String} tag 
     * @return {Set<GameObject>}
     */
    getObjectsByTag(tag) {
        return this.objectsByTag.get(tag) || new Set();
    }
}