import { default as _dayjs } from "dayjs";
import "dayjs/locale/id";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";
import minMax from "dayjs/plugin/minMax";

_dayjs.extend(localizedFormat);
_dayjs.extend(isBetween);
_dayjs.extend(minMax);
_dayjs.locale("id");

export const dayjs = _dayjs;
export default _dayjs;
