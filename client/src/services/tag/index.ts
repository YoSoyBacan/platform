import { TagDetailResult, TagListResult } from 'data/api';
import { TagDetailMock, TagListMock } from 'data/tags';

import { sleep } from '../../lib/utils';

// const BASE_URL = process.env.BASE_URL;

export const getTagList = async (limit = 10): Promise<TagListResult> => {
  // const response = await fetch(`${BASE_URL}/api/tagList?limit=${limit}`, {
  //   method: 'GET'
  // });
  // const jsonResp = await response.json();
  await sleep(1000);
  return Promise.resolve(TagListMock);
}

export const getTagDetail = async (tagId: string): Promise<TagDetailResult> => {
  await sleep(1200);
  return Promise.resolve(TagDetailMock);
}
