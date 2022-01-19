import React from 'react';
import { StatusBar, Alert } from 'react-native';
import { MovieProps } from '../../@types';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, setFavoriteList } from '../../redux';
import { format } from 'date-fns';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Button,
  ButtonText,
  Content,
  FavoriteList,
  MovieCardWrapper,
  MovieCard,
  MovieCardImage,
  MovieCardTitle,
  MovieCardReleaseDate,
  EmptyContent,
  EmptyText,
} from './styles';

export function Favorites() {
  const { favorite } = useSelector(
    (state: ApplicationState) => state.favoriteReducer
  );

  const dispatch = useDispatch();

  function handleClearAll() {
    Alert.alert(
      'Caution!',
      'Are you sure you want to clear all your favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => dispatch(setFavoriteList([] as MovieProps[])),
          style: 'destructive',
        },
      ]
    );
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Title>
          Your favorite movies,{'\n'}
          are here.
        </Title>
        <SubTitle>Easy, fast and useful.</SubTitle>
      </Header>
      <Button onPress={handleClearAll}>
        <ButtonText>Clear all</ButtonText>
      </Button>
      <Content>
        {favorite.length > 0 ? (
          <FavoriteList
            data={favorite}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <MovieCardWrapper key={index}>
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
        ) : (
          <EmptyContent>
            <EmptyText>You don't have any favorite movies.</EmptyText>
          </EmptyContent>
        )}
      </Content>
    </Container>
  );
}
