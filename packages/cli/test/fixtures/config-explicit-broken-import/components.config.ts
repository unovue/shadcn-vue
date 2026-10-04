// Intentionally broken: imports a module that does not exist, named
// 'components'. Used to verify that getRawConfig still surfaces this as a
// real ConfigParseError instead of swallowing it as "no config found".
import 'components'

export default {}
