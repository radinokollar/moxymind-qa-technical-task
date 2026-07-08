import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login', () => {
  // Importance: Authentication failure blocks core user flows. 
  // Accurate validation messages prevent user drop-off and reduce customer support overhead.
  
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Error message displays with invalid username', async () => {
    await loginPage.login('standarduser', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Error message displays with invalid password', async () => {
    await loginPage.login('standard_user', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});