import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const {
    delay: { value: delayValue },
    step: { value: stepValue },
    amount: { value: amountValue }
  } = e.currentTarget.elements;

  for (let i = 1; i <= amountValue; i += 1) {
    const currentDelay = Number(delayValue) + i * stepValue;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => notifySuccess(position, delay))
      .catch(({ position, delay }) => notifyFailure(position, delay));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(resolve, delay, { position, delay });
    } else {
      setTimeout(reject, delay, { position, delay });
    }
  });

}

function notifyFailure(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    timeout: 4000,
    clickToClose: true,
    pauseOnHover: false,
    showOnlyTheLastOne: false,
  });
}

function notifySuccess(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    timeout: 4000,
    clickToClose: true,
    pauseOnHover: false,
    showOnlyTheLastOne: false,
  });
}