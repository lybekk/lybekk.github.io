import matter = require('gray-matter')
import glob = require("glob")
import fs = require('fs')


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
	content: Content = {
		published: []
	}
	contentSourceDirectory: string = ""
	developmentMode: boolean = false

	/**
	 * 
	 * @param {ContentTransformerOptions} options takes contentSourceDirectory and development mode
	 */
	constructor(options: ContentTransformerOptions) {
		options = options || {};
		const envVarOrDefault = process.env.LYBEKK_TECH_CONTENT_DIR || './content'
		this.contentSource = options.contentSourceDirectory || envVarOrDefault
		this.isDevelopmentMode = options.developmentMode === true || false;
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

	get contentBatch(): Content {
		this.contentParser()
		if (this.isDevelopmentMode){
			return this.content
		} else {
			return { published: this.content.published }
		}
	}

	/**
	 * 
	 * @param dirCache Pass relative path as string
	 */
	saveToCache(dirCache: string = './cache') {
		if (!fs.existsSync(dirCache)){
			fs.mkdirSync(dirCache)
		}
		Object.entries(this.contentBatch).forEach( ([key, values]) => {
			fs.writeFileSync(
				`${dirCache}/${key}.json`, 
				JSON.stringify(values, null, 2)
			)
		})
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
			Object.assign(this.content, {
				unpublished: [],
				unknowns: [],
			});
		} else {
			this.developmentMode = false
		}
	}

	/**
	 * TODO: REFACTOR
	 */
	private contentParser(): void {
		const options = {
			cwd: this.contentSource,
			realpath: true,
		}
		const files: string[] = glob.sync('**/*.md', options)
		files.forEach( (fileName) => {
			const parsedContent: ParsedContent = matter.read(fileName);
			const isPublic = parsedContent.data.public === true;
			const hasPublic = parsedContent.data.hasOwnProperty('public')
			const contentStates = {
				isPublished: hasPublic && isPublic,
				isUnpublished: hasPublic && !isPublic,
			}
			if (contentStates.isPublished) {
				this.content.published.push(parsedContent)
			}
			if (this.isDevelopmentMode) {
				this.developmentModeFileHandler(fileName, parsedContent, contentStates)
			}
		})
	}

	developmentModeFileHandler = (fileName: string, parsedContent: ParsedContent, contentStates: ContentStates): void => {
		if (contentStates.isUnpublished) {
			this.content.unpublished?.push(fileName)
		} else {
			// TODO: more checks
			this.content.unknowns?.push(fileName)
		}
	}
	
}
