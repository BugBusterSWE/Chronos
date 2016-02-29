/**
 * Created by matteo on 24/02/16.
 * @author Matteo Di Pirro
 */

/**
 * An author of one, or more, plugins.
 */
class Author {
    /**
     * The name of the author
     */
    private name: string;

    /**
     * An array which contains all the plugins written by the author.
     */
    private plugins: string[];

    /**
     * Constructs an author
     * @param authorName The name of the author.
     */
    constructor(authorName: string) {
        this.name = authorName;
        this.plugins = [];
    }

    /**
     * This method allows to add a plugin to this author.
     * @param pluginName The name of the plugin.
     */
    addPlugin(pluginName: string): void {
        this.plugins.push(pluginName);
    }

    /**
     * This method returns the name of the author.
     * @returns {string} The name of the author.
     */
    getName(): string{
        return this.name;
    }

    /**
     * This method returns an array which contains the plugins written by the author.
     * @returns {string[]} Array of plugin names.
     */
    getPlugins(): string[] {
        return this.plugins;
    }
}