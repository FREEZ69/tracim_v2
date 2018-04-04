# -*- coding: utf-8 -*-
import json
import time

from pyramid.config import Configurator
from hapic.ext.pyramid import PyramidContext

from tracim.extensions import hapic
from tracim.config import RequestWithCFG
from tracim.views.example_api.example_api_controller import ExampleApiController
from tracim.views.default.default_controller import DefaultController


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    configurator = Configurator(settings=settings, autocommit=True)
    # Pyramids "plugin" include.
    configurator.include('pyramid_jinja2')
    # Add SqlAlchemy DB
    configurator.include('.models')
    # Override default request
    configurator.set_request_factory(RequestWithCFG)
    # set Hapic
    hapic.set_context(PyramidContext(configurator))
    # Add controllers
    default_controllers = DefaultController()
    default_controllers.bind(configurator)
    example_api_controllers = ExampleApiController()
    example_api_controllers.bind(configurator)

    time.sleep(1)
    s = json.dumps(
        hapic.generate_doc(
            title='Fake API',
            description='just an example of hapic API'
        )
    )
    time.sleep(1)
    # print swagger doc
    print(s)
    time.sleep(1)
    return configurator.make_wsgi_app()
