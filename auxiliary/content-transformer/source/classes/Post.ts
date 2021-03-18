import * as matter from 'gray-matter';

export class Post {
   content: string;
   data: {
       title?: string;
       published?: boolean;
    };
    excerpt: string | undefined;

    constructor(fileName: string) {
        const { content, data, excerpt } = matter.read(fileName, {excerpt: true});
        this.content = content
        this.data = {
            ...data
        }
        this.excerpt = excerpt
    }

    get isPublished(): boolean {
        if (this.isPrivate) return false;
        return this.data.published === true;
    }

    get isPrivate() {
        return this.data.hasOwnProperty('private');
    }

    get isUnpublished(): boolean {
        return this.data.published === false;
    }

    get isValid(): boolean {
        if (this.isPrivate) return false;
        return ["title", "date", "description", "tags", "published"].every(
            prop => this.data.hasOwnProperty(prop)
        );
    }

}
