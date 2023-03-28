import React from 'react';

import { ROUTES } from '../../../constants';
import { Wrapper } from '../wrapper';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  isError: boolean;
  errorMessage: string;
  message: string;
  isMessageSent: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { isError: false, errorMessage: '', message: '', isMessageSent: false };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.goToMainPage = this.goToMainPage.bind(this);
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    this.setState((prevState) => ({
      ...prevState,
      errorMessage: `${error.name}: ${error.message}`,
    }));
  }

  handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLTextAreaElement;

    this.setState((prevState) => ({ ...prevState, message: target.value }));
  }

  sendMessage() {
    this.setState((prevState) => ({ ...prevState, message: '', isMessageSent: true }));
  }

  goToMainPage() {
    document.location.replace(ROUTES.main);
  }

  render() {
    return this.state.isError ? (
      <main className={styles['error-boundary__main']}>
        <Wrapper>
          <h4>Ой... Что-то пошло не так</h4>
          <pre>{this.state.errorMessage}</pre>
          <textarea
            value={this.state.message}
            placeholder={
              this.state.isMessageSent
                ? 'Спасибо! Ваше сообщение отправлено!'
                : 'Опишите, пожалуйста, ситуацию, как вы попали на эту страницу'
            }
            disabled={this.state.isMessageSent}
            onChange={this.handleChange}
          />
          <button
            type='button'
            disabled={this.state.isMessageSent}
            onClick={this.sendMessage}
            className={styles.message_sent}
          >
            Отправить
          </button>
          <button type='button' onClick={this.goToMainPage} className={styles['link_to-main-page']}>
            На главную
          </button>
        </Wrapper>
      </main>
    ) : (
      this.props.children
    );
  }
}
