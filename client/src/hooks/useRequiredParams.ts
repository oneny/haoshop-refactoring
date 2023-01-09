import { useParams } from "react-router-dom"

type RequiredParams<Key extends string = string> = {
  readonly [key in Key]: string
}

export const useRequiredParams = <T extends string | Record<string, string> = string>(
  requiredParamNames: string[],
  componentName?: string
): Readonly<[T] extends [string] ? RequiredParams<T> : T> => {
  const routeParams = useParams()
  const requiredParams: { [key: string]: string } = {}
  for (const paramName of requiredParamNames) {
    const parameter = routeParams[paramName]
    if (!parameter) {
      throw new Error(
        `${
          componentName ? `The ${componentName}` : `This`
        } component should not be rendered on a route which does not have the ${paramName} parameter`
      )
    }
    requiredParams[paramName] = parameter
  }
  return requiredParams as [T] extends [string] ? RequiredParams<T> : T
}