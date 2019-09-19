import { formatMessage } from 'umi-plugin-react/locale';

export const wordsFormat = (wordsId: string) => formatMessage({ id: wordsId })

export const regex = {
  RE_ID_CARD_NUMBER_NUMBER: /^\d{17}(\d|X|x)$/,
  RE_EMAIL: /.+@.+\..+/,
  RE_PHONE_NUMBER_MOBIL: /^1\d{10}$/,
  RE_CHINESS_CHARTS: /^[\u4e00-\u9fa5]{0,}$/,
  RE_NUMBER: /^[0-9]*$/,
  RE_DATE_YYYY_MM_DD: /^\d{4}-\d{1,2}-\d{1,2}/,
  RE_RES_CODE_10000X: /^10000[023]$/,
  RE_NAME: /^\S.*\S$|^\S$/,
  RE_BANK_NUMBER: /^\d{0,}$/,
};
