import glob = require("glob")
import fs = require('fs')
import { Post } from './classes/Post'

/**
 * Usage: 
 * 
 * ES6:
 * const dataBatch = new DataBatch();
 * 
 * TypeScript:
 * const dataBatch: DataBatch = new DataBatch();
 */
export class ContentTransformer {
	content: Content;
	contentSourceDirectory: string = ""
	developmentMode: boolean = false

	/**
	 * @param {ContentTransformerOptions} options takes contentSourceDirectory and development mode
	 */
	constructor(options: ContentTransformerOptions) {
		options = options || {};
		const envVarOrDefault = process.env.LYBEKK_TECH_CONTENT_DIR || './content'
		this.contentSource = options.contentSourceDirectory || envVarOrDefault
		this.isDevelopmentMode = options.developmentMode === true || false;
		this.content = {
			published: [],
			unpublished: [],
			unknowns: [],
		}
	}

	/**
	 * TODO: Later: Add source: REST API
	 */
	get contentSource(): string {
		return this.contentSourceDirectory
	}

	set contentSource(sourceDir) {
		this.contentSourceDirectory = sourceDir
	}

	get contentBatch(): Partial<Content> {
		this.contentParser();
		if (this.isDevelopmentMode) {
			return this.content
		} else {
			return { published: this.content.published }
		}
	}

	/**
	 * 
	 * @param dirCache Pass relative path as string
	 */
	saveToCache(dirCache: string = './cache'): boolean {
		if (!fs.existsSync(dirCache)) {
			fs.mkdirSync(dirCache)
		}
		Object.entries(this.contentBatch).forEach(([key, values]) => {
			fs.writeFileSync(
				`${dirCache}/${key}.json`,
				JSON.stringify(values, null, 2)
			)
		})
		return true;
	}

	/**
	 * Enables contentBatch with unpublished and unknowns/unmarked
	 */
	get isDevelopmentMode(): boolean {
		return this.developmentMode === true
	}

	set isDevelopmentMode(value: boolean) {
		if (value === true) {
			this.developmentMode = true
		} else {
			this.developmentMode = false
		}
	}

	private contentParser(): void {
		if (this.content.published.length) {
			return
		}
		const options = {
			cwd: this.contentSource,
			realpath: true,
		}
		try {
			const files: string[] = glob.sync('**/*.md', options);
			files.forEach((fileName) => {
				const post = new Post(fileName);
				if (post.isPrivate) throw new TypeError(`Post marked private found in published list. File: ${fileName}`);
				if (post.isPublished && post.isValid) {
					this.content.published.push(post)
				}
				if (this.isDevelopmentMode) {
					this.developmentModeFileHandler(post)
				}
			})
		} catch (error) {
			return error;
		}
	}

	developmentModeFileHandler = (post: Post): void => {
		const destination = post.isUnpublished ? this.content.unpublished : this.content.unknowns;
		destination.push(post)
	}

}
