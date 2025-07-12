import {type SchemaTypeDefinition} from "sanity";
import {postType} from "./postType";
import {articleType} from "./articleType";
import {photoType} from "./photoType";
import {videoType} from "./videoType";
import {statType} from "./statType";

export const schemaTypes = [postType, articleType, photoType, videoType, statType];

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [...schemaTypes],
};
