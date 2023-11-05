import { SchemaOptions } from 'mongoose'

export const defaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  statics: {
    getFields(type: string) {
      const fields = this.schema.paths
      const keys = Object.keys(fields)

      return keys.filter((key) => fields[key]?.instance === type)
    },
  },
}
