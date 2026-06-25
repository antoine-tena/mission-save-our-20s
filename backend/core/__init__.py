from django.template.context import BaseContext
from copy import copy

# Monkeypatch django.template.context.BaseContext.__copy__ to fix Python 3.14+ compatibility.
# In Python 3.14+, copy(super()) returns a super() proxy object instead of the copied instance.
# This raises AttributeError when trying to assign attributes (like .dicts) to the copy.
# This fix is aligned with Django Ticket #35844 (commit 8d7b1423f89bcc3df57333fc79fa5aead17b0cbc).
def _patched_copy(self):
    duplicate = BaseContext()
    duplicate.__class__ = self.__class__
    duplicate.__dict__ = copy(self.__dict__)
    duplicate.dicts = self.dicts[:]
    return duplicate

BaseContext.__copy__ = _patched_copy
