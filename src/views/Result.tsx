import React, { useEffect, useState } from 'react';
import { action, useAppSelector, useAppDispatch } from '~/redux';
import { Input } from 'native-base';
import Bookshelf from '~/components/Bookshelf';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';

const { loadSearch } = action;
const { LoadStatus } = window;

const Search = ({ navigation }: StackResultProps) => {
  const { list } = useAppSelector((state) => state.search);
  const dict = useAppSelector((state) => state.dict.manga);
  const loadStatus = useAppSelector((state) => state.search.loadStatus);
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: keyword });
  }, [keyword, navigation]);

  const handleLoadMore = () => {
    dispatch(loadSearch({ keyword }));
  };
  const handleDetail = (id: string) => {
    navigation.navigate('Detail', { id });
  };

  if (loadStatus === LoadStatus.Pending && list.length === 0) {
    return <Loading />;
  }
  if (loadStatus === LoadStatus.Fulfilled && list.length === 0) {
    return <Empty />;
  }

  return (
    <Bookshelf
      list={list.map((item) => dict[item])}
      loadMore={handleLoadMore}
      itemOnPress={handleDetail}
    />
  );
};

export const SearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(loadSearch({ keyword, isReset: true }));
  };

  return (
    <Input
      ml={1}
      mr={30}
      w="4/5"
      size="2xl"
      bg="#6200ee"
      color="white"
      variant="underlined"
      placeholder="press enter to search"
      onChangeText={setKeyword}
      onSubmitEditing={handleSearch}
    />
  );
};

export default Search;