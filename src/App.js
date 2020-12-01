import React from 'react';
import { Route,HashRouter, BrowserRouter,Switch } from 'react-router-dom'

// navbar
import PrimarySearchAppBar from './components/Appbar'
import ArticleList from './components/article_posts'
import ArticlePage from './components/article_page'
import SearchPage from './components/SearchResult'

export default function App() {
  return (
    <BrowserRouter>
    
          <PrimarySearchAppBar />
      <Switch>
      <Route exact path="/"  component={ArticleList}/>
      <Route exact path="/article/:article_slug"  component={ArticlePage}/>
      <Route  path="/search/:search_slug" component={SearchPage}/>
      </Switch>
    </BrowserRouter>
    
  );
}