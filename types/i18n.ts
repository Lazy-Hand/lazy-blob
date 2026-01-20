export interface DictItem {
  id: string
  dictItemId: string
  dictTypeId: string
  dictTypeCode: string
  dictLabel: string
  dictValue: string
  dictSort: number
  status: string
  isDefault: string
  remark?: string
  i18nKey?: string
  createdAt: string
  createdBy?: string | null
  createdByName?: string | null
  updatedAt: string
  updatedBy?: string | null
  updatedByName?: string | null
  deleted: string
  extCol?: string | null
  extCol1?: string | null
  extCol2?: string | null
  extCol3?: string | null
  extCol4?: string | null
  extCol5?: string | null
}

export interface LanguageMessages {
  [locale: string]: Record<string, any>
}

export interface LanguagesResponse {
  locales: DictItem[]
  languageMessages: LanguageMessages
}

export interface LanguagesApiResponse {
  code: number
  msg: string
  data: LanguagesResponse
  success: boolean
}
