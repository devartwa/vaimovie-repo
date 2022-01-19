import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  MainParamList,
  RequesterResponseModel,
  ResultProps,
} from '../../@types';

import { format } from 'date-fns';
import { SearchBar } from '../../components/SearchBar';
import { StackNavigationProp } from '@react-navigation/stack';
import queryString from 'query-string';
import services from '../../services/services';
import requester from '../../services/requester';

import {
  Container,
  Content,
  Header,
  MovieList,
  MovieCardWrapper,
  MovieCard,
  MovieCardImage,
  MovieCardTitle,
  MovieCardReleaseDate,
  Loading,
  LoadingContent,
} from './styles';

type HomeNavigationProp = StackNavigationProp<MainParamList, 'Principal'>;
type HomeProps = { navigation: HomeNavigationProp };

type ResultListProps = ResultProps[];

export function Home({ navigation }: HomeProps) {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [image, setImage] = useState(
    'https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg'
  );
  const [searchListData, setSearchListData] = useState<ResultListProps>([]);
  const [data, setData] = useState<ResultProps[]>([]);
  const isMounted = useRef(true);

  let randomNumber = Math.floor(Math.random() * 10);

  async function loadData() {
    const api_key = '18ecb673913ae32664cd5b73b0e5828a';

    const endpointParams = queryString.stringify({
      api_key,
    });

    const service = {
      ...services.getPopular,
      endpoint: services.getPopular.endpoint.concat(endpointParams),
    };

    const result: RequesterResponseModel = await requester(service);

    if (result.success) {
      setSearchListData(result.data.results);
      setData(result.data.results);
      setImage(result.data.results[randomNumber].backdrop_path);
    } else {
      console.log('Error: ', result.error);
    }
    setLoading(false);
  }

  function handleMovieDetails(id: number) {
    navigation.navigate('MovieDetails', { id });
  }

  function handleFilterMovie() {
    const filteredData = searchListData.filter((customData) => {
      const titleValid = customData.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const dateValid = format(
        new Date(customData.release_date),
        'MM-dd-yyyy'
      ).includes(searchText);

      if (titleValid || dateValid) {
        return data;
      }
    });
    setSearchListData(filteredData);
  }

  function handleChangeInputText(text: string) {
    if (!text) {
      setSearchListData(data);
    }
    setSearchText(text);
  }

  useEffect(() => {
    loadData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingContent>
          <Loading />
        </LoadingContent>
      ) : (
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Header
            source={{ uri: `https://image.tmdb.org/t/p/original${image}` }}
          />
          <Content>
            <SearchBar
              placeholder="Search a movie..."
              onChangeText={handleChangeInputText}
              value={searchText}
              returnKeyType="search"
              onSubmitEditing={handleFilterMovie}
              onSearchButtonPress={handleFilterMovie}
            />
            <MovieList
              data={searchListData}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item, index }) => (
                <MovieCardWrapper
                  onPress={() => handleMovieDetails(item.id)}
                  key={index}
                >
                  <MovieCard>
                    <MovieCardImage
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                      }}
                    />
                    <MovieCardTitle numberOfLines={2}>
                      {item.title}
                    </MovieCardTitle>
                    <MovieCardReleaseDate>
                      Release Date:{' '}
                      {format(new Date(item.release_date), 'MM-dd-yyyy')}
                    </MovieCardReleaseDate>
                  </MovieCard>
                </MovieCardWrapper>
              )}
            />
          </Content>
        </Container>
      )}
    </React.Fragment>
  );
}
