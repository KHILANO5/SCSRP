# Contributing to SCSRP

Thank you for considering contributing to the Smart Campus Service Request Portal!

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

### Suggesting Features

Feature requests are welcome! Please:
- Check existing issues first
- Describe the feature clearly
- Explain why it would be useful
- Provide examples if possible

### Pull Requests

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

4. **Test your changes**
   - Ensure all existing functionality still works
   - Test new features thoroughly
   - Check for TypeScript errors

5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
   
   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Docs:` for documentation changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Wait for review

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Use `const` and `let`, never `var`
- Use async/await instead of callbacks
- Handle errors properly with try/catch
- Use meaningful variable and function names

### API Development

- Follow RESTful conventions
- Validate all inputs
- Return consistent response formats
- Use HTTP status codes correctly
- Document all endpoints

### Database

- Use parameterized queries (prevent SQL injection)
- Add appropriate indexes
- Write clear migration scripts
- Test queries before committing

## 🧪 Testing

Before submitting:
- Test all API endpoints
- Verify database operations
- Check error handling
- Test with different user roles

## 📚 Documentation

- Update README.md if adding features
- Document new API endpoints in API_CONTRACT.md
- Add JSDoc comments to functions
- Update database schema docs if needed

## ❓ Questions?

Feel free to create an issue for questions or clarifications.

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
