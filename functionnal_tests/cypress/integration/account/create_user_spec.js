const username = 'Francky'
const email = 'francky.vincent@cousine.com'
const correct_pwd = '123456'

const errShortPwd = '123'
const errLongPwd = '123'.repeat(200)
const errUsername = 'Vincent'
const errEmail = 'vincent.francky@sinecou.com'

describe('content :: account', () => {
  before(() => {
    cy.resetDB()
    cy.setupBaseDB()
  })

  beforeEach(() => {
    cy.loginAs('administrators')
    cy.visit('/ui/admin/user')
  })

  // it('Shows missing password error', () => {
  //   cy.get('[data-cy=adminUser__adduser__button]').click()
  //   cy.get('[data-cy=adduser_name').type(username)
  //   cy.get('[data-cy=adduser_email').type(email)
  //   cy.get('[data-cy=profile__list__item__administrators').click()
  //   cy.get('[data-cy=adminUser__adduser__form__submit').click()
  //   cy.get('.flashmessage').contains('Please type a name, an email, a password and select a profile')
  // })

  it('Shows missing username error', () => {
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adduser_email').type(errEmail)
    cy.get('[data-cy=adduser_password').type(correct_pwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('Please type a name, an email, a password and select a profile')
  })

  it('Shows missing email error', () => {
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adduser_name').type(errUsername)
    cy.get('[data-cy=adduser_password').type(correct_pwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('Please type a name, an email, a password and select a profile')
  })

  it('Shows missing profile error', () => {
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adduser_name').type(errUsername)
    cy.get('[data-cy=adduser_password').type(errEmail)
    cy.get('[data-cy=adduser_email').type(correct_pwd)
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('Please type a name, an email, a password and select a profile')
  })

  it('Shows error for password too long', () => {
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adduser_name').type(errUsername)
    cy.get('[data-cy=adduser_email').type(errEmail)
    cy.get('[data-cy=adduser_password').type(errLongPwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('New password is too long (maximum 512 characters)')
  })

  it('Shows error for password too short', () => {
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adduser_name').type(errUsername)
    cy.get('[data-cy=adduser_email').type(errEmail)
    cy.get('[data-cy=adduser_password').type(errShortPwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('New password is too short (minimum 6 characters)')
  })

  it('create a user with correct data', () => {
    cy.get('[data-cy=adminUser__adduser__form]').should('not.exist')
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adminUser__adduser__form]')
    cy.get('[data-cy=adduser_name').type(username)
    cy.get('[data-cy=adduser_email').type(email)
    cy.get('[data-cy=adduser_password').type(correct_pwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('User created')
    cy.get('[data-cy=adminUser__adduser__form]').should('not.exist')
    cy.contains(username)
  })

  it('Shows error for user already exists', () => {
    cy.get('[data-cy=adminUser__adduser__form]').should('not.exist')
    cy.get('[data-cy=adminUser__adduser__button]').click()
    cy.get('[data-cy=adminUser__adduser__form]')
    cy.get('[data-cy=adduser_name').type(username)
    cy.get('[data-cy=adduser_email').type(email)
    cy.get('[data-cy=adduser_password').type(correct_pwd)
    cy.get('[data-cy=profile__list__item__administrators').click()
    cy.get('[data-cy=adminUser__adduser__form__submit').click()
    cy.get('.flashmessage').contains('Email already exists')
    cy.contains(username)
  })
})
