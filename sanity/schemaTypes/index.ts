import {type SchemaTypeDefinition} from "sanity";
import {postType} from "./postType";
import {articleType} from "./articleType";
import {photoType} from "./photoType";
import {statType} from "./statType";
import {scheduleType} from "./scheduleType";

export const schemaTypes = [postType, articleType, photoType, statType, scheduleType];

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [...schemaTypes],
};
