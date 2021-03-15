import { Tag } from '../../models/tag.model';

export function parseSlugToTag(data: Tag[] | string): Tag[] {
  let otherTags = [];
  if (Array.isArray(data)) {
    otherTags = data.map((slug) => new Tag({ slug: slug }));
  } else if (data) {
    otherTags = [new Tag({ slug: data })];
  }
  return otherTags;
}
