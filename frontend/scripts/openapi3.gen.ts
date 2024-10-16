import fs from 'node:fs'
import openapiTS, { astToString } from 'openapi-typescript'
import path from 'path'
import ts from 'typescript'

const DATE = ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier('Date')
) // `Date`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()) // `null`

const docUrl = 'http://localhost:3000/doc'
const output = 'openapi.schema.d.ts'

const gen = async () => {
        const ast = await openapiTS(docUrl, {
                transform(schemaObject, _metadata) {
                        if (
                                schemaObject.format === 'date-time' ||
                                schemaObject.description === 'z-date-time'
                        ) {
                                return schemaObject.nullable
                                        ? ts.factory.createUnionTypeNode([
                                                  DATE,
                                                  NULL,
                                          ])
                                        : DATE
                        }
                },
        })

        // (optional) write to file
        fs.writeFileSync(path.join('src', 'schemas', output), astToString(ast))
}

gen()
        .then((_) => console.log('Schema Gen success.'))
        .catch((e) => {
                console.error(e)
                console.log('Schema Gen failed.')
        })
